import { AILogoPrompt } from "@/configs/AiModel";
import { db } from "@/configs/FirebaseConfig";
import axios from "axios";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { doc, setDoc } from "firebase/firestore"

export async function POST(req){
    console.log("Inside the route")
    const {prompt, email, title, desc, type, userCredits} = await req.json();

    let base64ImageWithMime = '';
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });
    console.log("First Stage")
    try{
        console.log("Second Stage")
        //Generate AI Text prompt for logo
        const AiPromptResult = await AILogoPrompt.sendMessage(prompt);

        const AiPrompt = JSON.parse(AiPromptResult.response.text()).prompt;
        console.log("Third Stage")
        //Generate logo From AI Modal
        if(type=='Free'){
            console.log("Fourth Stage")
            const response = await axios.post("https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
                AiPrompt,
                {
                    headers: {
                        Authorization: "Bearer " + process.env.HUGGING_FACE_API_KEY,
                        "Content-Type": "application/json",
                    },
                    responseType: "arraybuffer"
                }
            )

            //Convert to base 64 image
            const buffer = Buffer.from(response.data, "binary");
            const base64Image = buffer.toString("base64");
            base64ImageWithMime = `data:image/png;base64,${base64Image}`;
            console.log("Fifth Stage")
        } else {

            //Replicate API EndPoint
            const output = await replicate.run(
                "bytedance/hyper-flux-8step:81946b1e09b256c543b35f37333a30d0d02ee2cd8c4f77cd915873a1ca622bad",
                {
                  input: {
                    prompt: AiPrompt,
                    num_outputs: 1,
                    aspect_ratio: "1:1",
                    output_format: "png",
                    guidance_scale: 3.5,
                    output_quality: 80,
                    num_inference_steps: 8
                  }
                }
            );

            base64ImageWithMime = await ConvetImageToBase64(output);

            const docRef = doc(db, 'users', email)
            await updateDoc(docRef, {
                credits: Number(userCredits)-1
            })
        }

        //Save to firebase database
        try{
            console.log("Sixth Stage")
            await setDoc(doc(db, "users", email, "logos", Date.now().toString()),{
                image: base64ImageWithMime, 
                title: title,
                desc: desc
            })
        }catch(e){
            console.log("Error is: ", e)
        }


        return NextResponse.json({image: base64ImageWithMime});
    }catch(e){
        console.log("Error Stage: ", e)
        return NextResponse.json({error:e})
    }
}

async function ConvetImageToBase64(image){
    const resp = await axios.get(image, {responseType: 'arraybuffer'})
    const base64ImageRaw = Buffer.from(resp.data).toString('base64')
    return `data:image/png;base64,${base64ImageRaw}`
}