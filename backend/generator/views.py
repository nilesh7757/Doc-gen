from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import google.generativeai as genai
import json

@api_view(['POST'])
def chat(request):
    """
    API endpoint for the conversational legal document generator.
    """
    if not settings.GEMINI_API_KEY:
        return Response({'error': 'GEMINI_API_KEY is not configured'}, status=500)

    messages = request.data.get('messages', [])
    if not messages:
        return Response({'error': 'Messages are required'}, status=400)

    try:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel('models/gemini-2.5-flash-lite')

        system_instruction = """You are a helpful legal assistant. Your goal is to help the user create a legal document.
- First, ask follow-up questions to gather all the necessary details.
- When you have enough information, generate the full legal document in a JSON format like this: ```json{"type": "document", "text": "...your document here..."}```.
- If the user asks to update some information, you must regenerate the **entire** document with the updated information and provide the full document again in the same JSON format. Do not just provide the updated line or a confirmation message."""

        conversation_history = [{'role': 'user', 'parts': [system_instruction]}]
        for message in messages:
            role = 'user' if message['sender'] == 'user' else 'model'
            conversation_history.append({'role': role, 'parts': [message['text']]})

        response = model.generate_content(conversation_history)

        # The response from the model is just text, so we need to parse it to see
        # if it is a question or the final document.
        # For now, we will assume that if the response contains "```json", it is the final document in JSON format.
        # Otherwise, it is a question.
        if '```json' in response.text:
            # It's the final document
            # Extract the JSON part from the response
            json_str = response.text.split('```json')[1].split('```')[0]
            document_data = json.loads(json_str)
            return Response(document_data)
        else:
            # It's a question
            return Response({'type': 'question', 'text': response.text})

    except Exception as e:
        print(f"Error in chat view: {e}")
        return Response({'error': str(e)}, status=500)
