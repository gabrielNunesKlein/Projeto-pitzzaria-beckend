import prismaClient from "../../prisma"

interface CategoryRequest {
    name: string;
}

class CreateCategoryService {

    async execute({ name }: CategoryRequest) {

        if(name === ''){
            throw new Error("Category not informed");
        }
/*
        const categoryAlRedyExist = prismaClient.category.findFirst({
            where: {
                name: name
            }
        });

        if(categoryAlRedyExist){
            throw new Error("Category is allready");
        }*/

        const category = prismaClient.category.create({
            data:{
                name: name
            },
            select: {
                id: true,
                name: true
            }
        })

        return category;
    }
    
}

export { CreateCategoryService }