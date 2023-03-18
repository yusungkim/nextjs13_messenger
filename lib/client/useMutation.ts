import { useState } from "react"

interface MutationInput {
  [key: string]: any
}

interface MutationOptions {
  headers?: {
    [key: string]: string
  }[]
}

interface MutationState<T> {
  loading: boolean
  data: T | null
  error: any | null
}

type Mutator = (input: MutationInput) => Promise<void>
type MutationResponse<T> = [Mutator, MutationState<T>]

export default function useMutation<T = any>(
  url: string,
  options: MutationOptions = {}
): MutationResponse<T> {
  const [state, setState] = useState<MutationState<T>>({ loading: false, data: null, error: null })

  const mutator = async (input: MutationInput) => {
    setState((prev) => { return { ...prev, loading: true } })
    const headers = options.headers || {}

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify(input)
      })
      const output = await res.json() as T
      setState((prev) => ({ ...prev, loading: false, data: output, error: null }))
    } catch (e) {
      setState((prev) => ({ ...prev, loading: false, data: null, error: e }))
    }
  }

  return [mutator, state]
}
