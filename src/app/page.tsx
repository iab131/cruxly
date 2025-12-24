import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// In a real app, you'd fetch this from the DB via a Server Action or direct DB call if it's a Server Component
// import { prisma } from "@/lib/prisma"

// Mock Data mimicking the DB structure
const fetchProblems = async () => {
  // await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    { id: "1", name: "The Slab", grade: "V3", gym: "Crux Climbing", image: "https://images.unsplash.com/photo-1598555845686-25f00e2a8627?auto=format&fit=crop&q=80&w=800", type: "Boulder" },
    { id: "2", name: "Overhang Beast", grade: "V5", gym: "Vertical Limits", image: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?auto=format&fit=crop&q=80&w=800", type: "Boulder" },
    { id: "3", name: "Crimpy Boi", grade: "V4", gym: "Crux Climbing", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=800", type: "Boulder" },
    { id: "4", name: "Project X", grade: "V7", gym: "Boulders Inc", image: "https://images.unsplash.com/photo-1578306071477-0c7da0d2e5b7?auto=format&fit=crop&q=80&w=800", type: "Boulder" },
  ]
}

export default async function FeedPage() {
  const problems = await fetchProblems()

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">Discovery Feed</h1>
        <Button variant="outline" className="hidden md:flex">Filter Problems</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {problems.map((prob) => (
          <Card key={prob.id} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer bg-white">
            <div className="aspect-[4/3] relative bg-slate-100 overflow-hidden">
              <img
                src={prob.image}
                alt={prob.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-2 right-2 bg-blue-950/90 hover:bg-blue-950 text-white border-0 font-bold">
                {prob.grade}
              </Badge>
            </div>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg font-bold text-slate-900 line-clamp-1">{prob.name || "Untitled Climb"}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm font-medium text-blue-950 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  {prob.gym}
                </span>
                <span className="text-xs text-muted-foreground font-normal">{prob.type}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
