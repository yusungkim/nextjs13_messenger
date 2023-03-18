export function cls(...classnames: string[]) {
  return classnames.join(" ")
}

export function cfImage(
  imageId: string | null,
  varient: string
): string {
  if (!imageId) return "https://imagedelivery.net//NO_IMAGE"
  return `https://imagedelivery.net/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH}/${imageId}/${varient}`
}

export const myProfilePic = cfImage("e64b420c-5dfd-4b3b-140f-de2beab75800", "avatar")