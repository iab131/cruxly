"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createProblem } from "@/app/actions/problems"
import { useRouter } from "next/navigation"
import { Loader2, UploadCloud } from "lucide-react"

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const router = useRouter()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0]
            // Basic client-side preview
            setPreview(URL.createObjectURL(selectedFile))
            setFile(selectedFile)
        }
    }

    // Basic image resize function
    const resizeImage = (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = URL.createObjectURL(file)
            img.onload = () => {
                const canvas = document.createElement("canvas")
                const MAX_WIDTH = 1920
                const scale = MAX_WIDTH / img.width
                const width = scale < 1 ? MAX_WIDTH : img.width
                const height = scale < 1 ? img.height * scale : img.height

                canvas.width = width
                canvas.height = height
                const ctx = canvas.getContext("2d")
                ctx?.drawImage(img, 0, 0, width, height)
                canvas.toBlob((blob) => {
                    if (blob) resolve(blob)
                    else reject(new Error("Canvas to Blob failed"))
                }, file.type, 0.8) // 0.8 quality
            }
            img.onerror = reject
        })
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!file) return

        setUploading(true)
        try {
            // 1. Resize
            const resizedBlob = await resizeImage(file)

            // 2. Get Signed URL
            const res = await fetch("/api/upload/sign", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contentType: file.type,
                    fileName: file.name
                }),
            })
            const { signedUrl, publicUrl } = await res.json()

            // 3. Upload to R2
            await fetch(signedUrl, {
                method: "PUT",
                body: resizedBlob,
                headers: { "Content-Type": file.type },
            })

            // 4. Submit Metadata to Server Action
            const formData = new FormData(event.currentTarget)
            formData.append("imageUrl", publicUrl)

            await createProblem(formData)

            router.push("/")
        } catch (error) {
            console.error("Upload failed", error)
            alert("Upload failed. Check console.")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-full p-4 py-8">
            <Card className="w-full max-w-lg border-slate-200 shadow-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-primary">Upload Route</CardTitle>
                    <CardDescription>Share your latest send or project details.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="image">Route Photo / Video</Label>
                            <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    onChange={handleFileChange}
                                    required
                                />
                                {preview ? (
                                    <img src={preview} alt="Preview" className="mx-auto max-h-48 rounded shadow-sm object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <UploadCloud className="w-8 h-8 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                                        <div className="text-muted-foreground text-sm">Click to upload media</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="grade">Grade</Label>
                                <Input id="grade" name="grade" placeholder="V3" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Type</Label>
                                <Input id="type" name="type" placeholder="Boulder" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gym">Location (Gym or Crag)</Label>
                            <Input id="gym" name="gymName" placeholder="Search location..." required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Notes</Label>
                            <Textarea id="description" name="description" placeholder="Beta, thoughts, or crux info..." />
                        </div>

                        <Button className="w-full bg-primary text-white hover:bg-blue-900" disabled={uploading}>
                            {uploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : "Post Route"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
