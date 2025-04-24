import Header from "@/components/header"
import StudentList from "@/components/student-list"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto pt-6">
        <StudentList />
      </div>
    </main>
  )
}
