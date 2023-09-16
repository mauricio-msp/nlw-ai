import { type FastifyInstance } from 'fastify'
import { prisma } from '@/lib/prisma'

export async function getAllPromptsRoute(fastify: FastifyInstance) {
  fastify.get('/prompts', async (request, reply) => {
    const prompts = await prisma.prompt.findMany()

    if (!prompts.length) {
      return reply.status(204).send({ message: 'No found prompts.' })
    }

    return reply.status(200).send({ prompts })
  })
}
