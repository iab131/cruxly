import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-lg">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left space-y-2">
                    <h1 className="text-3xl font-bold text-primary">Climber Name</h1>
                    <p className="text-muted-foreground">@climber_handle</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <Badge variant="secondary">V5 Boulderer</Badge>
                        <Badge variant="secondary">5.11a Sport</Badge>
                    </div>
                    <div className="pt-2 flex gap-3 justify-center md:justify-start">
                        <Button>Edit Profile</Button>
                        <Button variant="outline">Share</Button>
                    </div>
                </div>

                <div className="flex gap-8 text-center bg-white p-4 rounded-xl border md:bg-transparent md:p-0 md:border-0">
                    <div>
                        <div className="text-2xl font-bold text-primary">124</div>
                        <div className="text-xs text-muted-foreground uppercase font-medium">Sends</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-primary">12</div>
                        <div className="text-xs text-muted-foreground uppercase font-medium">Projects</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-primary">850</div>
                        <div className="text-xs text-muted-foreground uppercase font-medium">Points</div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-primary border-b pb-2">Recent Activity</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Placeholder items */}
                    {[1, 2, 3].map(i => (
                        <Card key={i}>
                            <CardContent className="p-4 flex gap-4 items-center">
                                <div className="h-12 w-12 bg-slate-100 rounded-md flex items-center justify-center text-xl">🧗</div>
                                <div>
                                    <p className="font-medium text-primary">Sent <span className="font-bold">Pink Problem</span></p>
                                    <p className="text-sm text-muted-foreground">Crux Climbing • V4</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
