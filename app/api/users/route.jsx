import { db } from "@/configs/FirebaseConfig"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { NextResponse } from "next/server";

export async function POST(req){
 
    const {userEmail, userName} = await req.json()

    try{
 
        // Check if user exist or not
        const docRef = doc(db, "users", userEmail);
        const docSnap = await getDoc(docRef);

        // If user exist
        if(docSnap.exists()){
            return NextResponse.json(docSnap.data());
        } else {
            
            // Else insert the new user
            const data = {
                name: userName,
                email: userEmail,
                credits: 5
            }
            await setDoc(doc(db, 'users', userEmail), {
                ...data
            })

            return NextResponse.json(data);
        }
    }catch(e){
        return NextResponse.json({error:e})
    }
}