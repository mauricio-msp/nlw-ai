import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function AvatarUser() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/mauricio-msp.png"
        alt="avatar-image-github"
        className="cursor-pointer"
      />
      <AvatarFallback className="text-white bg-gradient-to-br from-blue-500 to-green-500">
        MP
      </AvatarFallback>
    </Avatar>
  )
}
