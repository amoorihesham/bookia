CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"orgainer" varchar NOT NULL,
	"ticket_price" real NOT NULL,
	"tickets" numeric DEFAULT '1' NOT NULL,
	"place" varchar NOT NULL,
	"gusts" varchar[],
	"featured" boolean DEFAULT false,
	"held_on" date NOT NULL,
	"open" boolean DEFAULT true,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_orgainer_users_id_fk" FOREIGN KEY ("orgainer") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;