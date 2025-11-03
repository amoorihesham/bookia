export default function PlansGridSkeleton() {
  return (
    <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-10 justify-items-center'}>
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          className='w-full h-[120px] bg-card border rounded-md animate-pulse'
          key={idx + 1}
        />
      ))}
    </div>
  );
}
