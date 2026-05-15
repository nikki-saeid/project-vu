alter table "public"."subscriptions" add column "card_brand" text;

alter table "public"."subscriptions" add column "card_last4" text;

alter table "public"."subscriptions" add column "payment_method_id" text;

CREATE UNIQUE INDEX subscriptions_payment_method_id_key ON public.subscriptions USING btree (payment_method_id);

CREATE UNIQUE INDEX subscriptions_stripe_subscription_id_key ON public.subscriptions USING btree (stripe_subscription_id);

alter table "public"."subscriptions" add constraint "subscriptions_payment_method_id_key" UNIQUE using index "subscriptions_payment_method_id_key";

alter table "public"."subscriptions" add constraint "subscriptions_stripe_subscription_id_key" UNIQUE using index "subscriptions_stripe_subscription_id_key";


