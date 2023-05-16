import { rest} from 'msw'
export const handlers = [
    rest.get('http://localhost:3000/services/' , (request , respond , context) =>{
        return respond(context.status(200 ),
        context.json([

        ]))

    })

]