import { CreateNewEventForm } from "@/features/events/components";


export default function NewEventPage() {
  return (
    <div>
      <div className='mx-auto max-w-2xl space-y-6 text-center'>
        <h1 className='text-center text-4xl font-semibold lg:text-5xl'>Create new event</h1>
        <p>
          Start by defining the basic details of your event. Publish it for public and remember that, You can always
          modify these later.
        </p>
      </div>
      <CreateNewEventForm />
    </div>
  );
}
