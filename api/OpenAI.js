import React, {
    createContext,
    useState,
    useContext,
    useEffect
} from "react";
import axios from "axios";


const api_key = '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'

const chatgpt_endpoint = 'https://api.openai.com/v1/chat/completions'
const dalle_endpoint = 'https://api.openai.com/v1/images/generations'

const client = axios.create(
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + api_key
        },
    }
)




export const chat = async (user_prompt, user_message_list) => {

    console.log('userprompt :', user_prompt)
    try {
        // //console.log('topic_id_test',args)
        const response = await client.post(chatgpt_endpoint,
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: 'Here is the message : ' + user_prompt + '. Show Yes if this prompt wants to generate Text and show No if the prompt wants to generate an Image'
                    }
                ]

            }

        )

        console.log('respnse_chat', response.data.choices[0].message.content)

        const resp = response.data.choices[0].message.content

        if (resp === 'Yes') {
            console.log('chatgpt_call')
            const gpt_resp = ChatgptApi(user_prompt, user_message_list)
        }
        else {
            console.log('dalle_call')
            const dall_resp = DalleAApi(user_prompt, user_message_list)
        }
    }
    catch (error) {
        console.log("error_chat", error)
        return Promise.resolve({ success: false, msg: error.message });
    }

}




export const ChatgptApi = async (user_prompt) => {
    try {

       

        // return ({
        //     role :'assistant',
        //     content : "rocket"
        //     } )



        const response = await client.post(chatgpt_endpoint,
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: user_prompt
                    }
                ]

            }

        )
        console.log('chatgpt_resp', response.data.choices[0])
        console.log('chatgpt_resp', response.data.choices[0].message)

        return response.data.choices[0].message


    }
    catch (error) {
        console.log("chatgpt_error", error)
    }

}


export const DalleAApi = async (user_prompt) => {
    console.log('dalle_userprompt', user_prompt)
    try {

        const response = await client.post(dalle_endpoint,
            {
                prompt: user_prompt,
                n: 1,
                size: '512x512'
            }

        )

        console.log('dalle_resp', response.data.data)

        let img_url = response.data.data[0].url

        let img_json = {

            role: 'assistant',
            content: img_url
        }


        return img_json


        
    }
    catch (error) {
        console.log("dalle_error", error)
    }

}