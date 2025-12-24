import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "@/lib/r2";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
    try {
        const { contentType, fileName } = await request.json();

        if (!contentType || !fileName) {
            return NextResponse.json(
                { error: "Missing contentType or fileName" },
                { status: 400 }
            );
        }

        const fileId = uuidv4();
        // Sanitize extension or use original name logic if preferred. 
        // Here we preserve extension from original fileName but use UUID for key
        const extension = fileName.split('.').pop();
        const key = `uploads/${fileId}.${extension}`;

        const signedUrl = await getSignedUrl(
            r2,
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: key,
                ContentType: contentType,
            }),
            { expiresIn: 3600 }
        );

        const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

        return NextResponse.json({ signedUrl, publicUrl, fileId });
    } catch (error) {
        console.error("Error generating signed URL:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
