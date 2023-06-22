import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { swimMeetValidationSchema } from 'validationSchema/swim-meets';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.swim_meet
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSwimMeetById();
    case 'PUT':
      return updateSwimMeetById();
    case 'DELETE':
      return deleteSwimMeetById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSwimMeetById() {
    const data = await prisma.swim_meet.findFirst(convertQueryToPrismaUtil(req.query, 'swim_meet'));
    return res.status(200).json(data);
  }

  async function updateSwimMeetById() {
    await swimMeetValidationSchema.validate(req.body);
    const data = await prisma.swim_meet.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSwimMeetById() {
    const data = await prisma.swim_meet.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
