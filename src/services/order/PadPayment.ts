import prismaClient from "../../prisma"

interface PadPaymentRequest {
    order_id: string;
}

class PadPaymentService {

    async execute({ order_id }: PadPaymentRequest){

        const order = await prismaClient.order.update({
            where: {
                id: order_id
            },

            data: {
                status_payment: 'CONCLUIDA'
            }
        })

        return order;
    }
}

export { PadPaymentService };