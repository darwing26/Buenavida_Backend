export default interface RepositoryP<E, T> {
    findAll: () => Promise<T[]>
    findById: (id: E) => Promise<T>
    save: (item: T) => void
    delete: (id: E) => Promise<boolean>
  }