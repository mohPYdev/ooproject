import { rest } from 'msw'
const username = 'negar'
const password = 'Negar@barooti79'
export const handlers = [
    rest.post('http://localhost:3000/auth/token/login/', ({ username, password }, respond, context) => {
        return respond(context.status(200),
            context.json(
                {
                    user: {
                        email: 's@gmail.com',
                        id: 2,
                        username: 'negar',
                        phone_number: '3',
                    }
                }
            ))

    })

]