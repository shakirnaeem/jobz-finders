// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const jwt = require('jsonwebtoken')
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default function handler(req, res) {
  var successResponse = false;
  if (req.body.userName == 'baqir.naseem' && req.body.password == 'N@seem2014')
    successResponse = true;
  const token = jwt.sign({ sub: 1 }, serverRuntimeConfig.secret, { expiresIn: '7d' });
  res.status(200).json({ success: successResponse, token: token })
}