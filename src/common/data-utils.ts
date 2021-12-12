import { Dob, Location, Name } from '../model/user'

export function getUserDateOfBirthText(dob: Dob) {
  return new Date(dob.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function getUserFullNameText(name: Name) {
  return name.first + ' ' + name.last
}

export function getUserLocationText(location: Location) {
  return location.city + ', ' + location.country
}
