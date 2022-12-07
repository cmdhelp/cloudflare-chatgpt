

const url = "https://chat.openai.com/api/auth/session"
const ua = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36'

const cook = "your cookie"



async function gatherResponse() {

    const init = {
        headers: {
            'cookie': `__Secure-next-auth.session-token=${cook}`,
            'user-agent': ua
        },
    };
    const response = await fetch(url, init);
    const json = await response.json()
    const token = json['accessToken']
    return token
}

async function getMessage(token, jsonData) {
    console.log(token)
    const body = {
        action: 'next',
        messages: [
            {
                id: jsonData['id'],
                role: 'user',
                content: {
                    content_type: 'text',
                    parts: [jsonData['message']]
                }
            }
        ],
        model: 'text-davinci-002-render',
        parent_message_id: jsonData['message_id']
    }
    const url = `https://chat.openai.com/backend-api/conversation`

    const init = {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'user-agent': ua
        },
    };
    const response = await fetch(url, init);
    const json = await response.text()
    return json
}

export default {
    async fetch(request, env) {
        return await handleRequest(request)
    }
}




async function handleRequest(request) {
    const corsHeader = {
        'Access-Control-Allow-Headers': "*",
        'Access-Control-Allow-Methods': "POST",
        'Access-Control-Allow-Origin': "*",
    }

    if (request.method === "OPTIONS") {
        return new Response("Ok", { headers: corsHeader })
    }





    if (request.method === 'POST') {
        const body = await request.text()
        const jsonData = JSON.parse(body)
        const token = await gatherResponse()
        const json = await getMessage(token, jsonData)


        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
        };
        return new Response(json, { headers });

    }

    let response = new Response(JSON.stringify({ 'message': 'only post' }));
    return response;
}
