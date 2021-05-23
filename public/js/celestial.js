import { Orb } from './lib/orb.v2.js'

export const celestial = {
  sun: new Orb.Sun(),
  moon: new Orb.Moon(),
  mercury: new Orb.Mercury(),
  venus: new Orb.Venus(),
  mars: new Orb.Mars(),
  jupiter: new Orb.Jupiter(),
  saturn: new Orb.Saturn(),
  uranus: new Orb.Uranus(),
  neptune: new Orb.Neptune(),
}

export const getCelestialLocation = ({ myLocation, target, time }) => {
  if (!celestial[target]) throw new Error(`${target}は存在しません`)

  return new Orb.Observation({
    observer: myLocation,
    target: celestial[target],
  }).azel(time)
}
