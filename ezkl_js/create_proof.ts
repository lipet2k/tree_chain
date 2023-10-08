// This system is actually under maintanance, right now. So, I can't use it.

// import hub from '@ezkljs/hub';
// import getConfig from 'next/config';

// export default async function create_proof(url: string) {
//     const { publicRuntimeConfig } = getConfig();
//     // const pixels_array: number[] = []
//     const healthStatus = await hub.healthCheck()

//     console.log(JSON.stringify(healthStatus, null, 2));

//     const artifactId: string = publicRuntimeConfig.ARTIFACT_ID;
//     const pixels_array = await sharp(url).resize(32, 32).grayscale().raw().toBuffer();

//     const input = {
//         input_data: [pixels_array],
//     }
//     console.log(input);

//     const initiateProofResponse = await hub.initiateProof(artifactId, JSON.stringify(input))
//     console.log(JSON.stringify(initiateProofResponse), null, 2)
//     return initiateProofResponse;

// }