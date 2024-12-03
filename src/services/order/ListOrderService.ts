import prismaClient from "../../prisma"

class ListOrderService {

    async execute() {

        const orders = await prismaClient.order.findMany({
            where: {
                OR: 
                [
                    {
                        status_payment: "PENDENTE"
                    },

                    {
                        status_payment: "ATIVA"
                    },
/*
                    {
                        draft: false,
                    },
*/
                    {
                        status: false,
                    }

                ],
                AND: [
                    {
                        draft: false
                    }
                ]
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        return orders;

    }
}

export { ListOrderService }