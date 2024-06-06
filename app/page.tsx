import Card, { Status } from "@/components/Card";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-violet-950 via-purple-600 to-pink-500">
      <div className="flex justify-center w-full my-4 pt-4">
        <button className="btn btn-secondary w-5/6 md:4/6 lg:3/6">
          Add new machine
        </button>
      </div>
      <div className="grid justify-items-center space-y-4">
        <Card
          id="0000001"
          ct={20.1}
          dt={40.2}
          ch={56.7}
          dh={89}
          s={Status.HEALTHY}
        />
        <Card
          id="0000002"
          ct={20.1}
          dt={40.2}
          ch={56.7}
          dh={89}
          s={Status.UNHEALTHY}
        />
      </div>
    </main>
  );
}
