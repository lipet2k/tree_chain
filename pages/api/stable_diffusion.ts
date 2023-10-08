// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config';

type Data = {
  stable_diffusion_url: string,
  image_bb_url: string,
}

const { serverRuntimeConfig } = getConfig()

async function getStableDiffusionImage(image_bb_url: string) {

  const raw = JSON.stringify({
    init_image: image_bb_url,
    key: serverRuntimeConfig.STABLE_DIFFUSION_API_KEY,
    prompt: "An anime style NFT image of the given image",
    num_inference_steps: 30,
    guidance_scale: 7.5,
    samples: 1,
    width: 512,
    height: 512,
    strength: 0.5,
  });

  const requestOptions = {
    method: 'POST',
    body: raw,
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  }

  const response = await fetch(`https://stablediffusionapi.com/api/v3/img2img`, requestOptions)
  const json = await response.json()
  const stable_diffusion_url = json.output[0]
  return stable_diffusion_url
} 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const imageBytes = req.body.imageBytes;

  const formData = new FormData()
  formData.append('image', imageBytes);

  const params = new URLSearchParams({
    key: serverRuntimeConfig.IMG_BB_API_KEY,
  });

  const requestOptions = {
    method: 'POST',
    body: formData,

  }

  const response = await fetch(`https://api.imgbb.com/1/upload?` + params, requestOptions)
  const json = await response.json()
  const image_bb_url = json.data.url

  const stable_diffusion_url: string = await getStableDiffusionImage(image_bb_url);

  return res.status(200).json({ stable_diffusion_url: stable_diffusion_url, image_bb_url: image_bb_url })
}
