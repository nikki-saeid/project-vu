drop policy "Allow select for business owner" on "public"."subscriptions";


  create policy "Allow select for business owner"
  on "public"."subscriptions"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.businesses
  WHERE ((businesses.id = subscriptions.business_id) AND (businesses.user_id = ( SELECT auth.uid() AS uid))))));



