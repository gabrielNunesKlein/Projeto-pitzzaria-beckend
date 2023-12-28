import prismaClient from "../../prisma"

class DetailUserService {

    async execute(user_id: Number) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: Number(user_id)
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user;
    }
}

export { DetailUserService }