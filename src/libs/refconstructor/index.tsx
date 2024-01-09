import { useRouter } from 'next/router';

export default function ConstructReference(path, locale = undefined) {
  try {
    if (locale != undefined) {
      return locale + path;
    } else {
      return GetRouterLocalePath(path);
    }
  } catch {
    return GetRouterLocalePath(path);
  }
}

function GetRouterLocalePath(path) {
  const router = useRouter();
  return '/' + router?.locale + path;
}
