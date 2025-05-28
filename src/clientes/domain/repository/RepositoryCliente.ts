export default interface Repository<E, T> {
    findById: (id: E) => Promise<T>
    save: (item: T) => void
   
}
