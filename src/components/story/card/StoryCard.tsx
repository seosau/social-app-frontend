import { IStory } from "@/interfaces/story.interfaces"
import { Avatar, Box } from "@mui/material"
import { blue } from "@mui/material/colors"
import Link from "next/link"

type StoryCardProps = {
    story: IStory,
}
export function StoryCard({
    story
}: StoryCardProps) {
    return (
        <>
            <Link href={`/story/${story.id}`}>
                <Box
                    width={"100%"}
                    height={"100%"}
                    sx={{
                        position: 'relative',
                    }}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <img
                        src={story.image}
                        loading="lazy"
                        className="object-scale-down w-full"
                    />
                    <Link href={`/profile/${story.userId}`}>
                        <Avatar
                            alt="Remy Sharp"
                            src={story.user.image}
                            sx={{
                                width: 40,
                                height: 40,
                                border: 4,
                                borderColor: blue[500],
                                position: 'absolute',
                                zIndex: 10,
                                top: 3,
                                left: 3,
                            }}
                        />
                    </Link>
                </Box>
            </Link>
        </>
    )
}