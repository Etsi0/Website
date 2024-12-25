import { apiFetch } from '@/lib/util';
import { collectionSchema, projectSchema, versionSchema } from '@/schema/minecraft/main';

const baseUrl = 'https://api.modrinth.com/';

//! experimental api route
export async function GetCollection(id: string) {
	return await apiFetch(`${baseUrl}v3/collection/${id}`, { method: 'GET' }, collectionSchema);
}

export async function GetProjects(ids: string[]) {
	return await apiFetch(`${baseUrl}v2/projects?ids=${encodeURIComponent(JSON.stringify(ids))}`, { method: 'GET' }, projectSchema);
}

export async function GetVersions(id: string) {
	return await apiFetch(`${baseUrl}v2/project/${encodeURIComponent(id)}/version?loaders=["fabric"]&featured=true`, { method: 'GET' }, versionSchema);
}
