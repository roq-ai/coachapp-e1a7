import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { swimMeetValidationSchema } from 'validationSchema/swim-meets';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getSwimMeets();
    case 'POST':
      return createSwimMeet();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSwimMeets() {
    const data = await prisma.swim_meet
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'swim_meet'));
    return res.status(200).json(data);
  }

  async function createSwimMeet() {
    await swimMeetValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.event?.length > 0) {
      const create_event = body.event;
      body.event = {
        create: create_event,
      };
    } else {
      delete body.event;
    }
    const data = await prisma.swim_meet.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
