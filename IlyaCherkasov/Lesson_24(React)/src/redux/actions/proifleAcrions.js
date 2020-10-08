export const PROFILE_LOAD = 'PROFILE_LOAD';
export const NEW_PROFILE = 'NEW_PROFILE';

export function readProfile() {
  return { type: PROFILE_LOAD };
}

export function setNewProfile(newProfile) {
  return {
    type: NEW_PROFILE,
    payload: newProfile,
  };
}
