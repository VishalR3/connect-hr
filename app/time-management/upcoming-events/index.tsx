import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
}

export default function UpcomingEvents() {
  const events: Event[] = Array(10)
    .fill(0)
    .map(() => ({
      id: faker.database.mongodbObjectId(),
      name: faker.helpers.arrayElement([
        "Holi",
        "Diwali",
        "Eid",
        "New Year",
        "Christmas",
      ]),
      date: faker.date.future().toISOString(),
      time: faker.date.past().toISOString(),
      location: faker.location.city(),
    }));
  return (
    <Card className="h-96 overflow-hidden shadow-lg">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>List of upcoming events</CardDescription>
      </CardHeader>
      <CardContent className="overflow-y-auto h-full">
        {events.map((event) => (
          <div key={event.id} className="mb-4 flex items-center gap-4">
            <div className="flex flex-col">
              <div className="text-xl font-bold">
                {dayjs(event.date).format("DD")}
              </div>
              <div className="text-sm">{dayjs(event.date).format("MMM")}</div>
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="font-semibold">{event.name}</h3>
              <p className="text-sm text-muted-foreground">{event.location}</p>
            </div>
            <div className="text-sm">
              <p>{dayjs(event.time).format("hh:mm A")}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
