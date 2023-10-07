import hub from '@ezkljs/hub';

export default async function create_proof() {
    const healthStatus = await hub.healthCheck()

    console.log(JSON.stringify(healthStatus, null, 2));
}