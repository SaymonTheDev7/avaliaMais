import { Button } from "@/components/ui/button";
import { Menu, Bell } from "lucide-react";
import { AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";

export default function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-[#003366] text-white">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="text-white">
                        <Menu style={{ width: '32px', height: '32px' }} />
                    </Button>
                    <div className="flex items-center">
                        <Image
                            className='ml-10'
                            src="/Logo.png"
                            alt="Logo Avalia+"
                            width={150}
                            height={50}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-white">
                        <Bell style={{ width: '32px', height: '32px' }} />
                    </Button>
                    <Avatar className="h-10 w-10 border-2 border-white">
                        <AvatarImage src="https://tryeasel.dev/placeholder.svg?width=40&height=40" alt="User profile" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            </header>
    )
}