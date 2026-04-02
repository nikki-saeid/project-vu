import DialogForm from '@/components/dialog-form';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'

export default function UpdateSubscription() {
     const [open, setOpen] = useState(false);
  
      return (
          <DialogForm
              title="Delete account"
              id="delete-account"
              open={open}
              onOpenChange={setOpen}
              trigger={
                  <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      className="font-light text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                  >
                      Delete account
                  </Button>
              }
            //   form={(id, setIsLoading) => <BusinessDeleteForm id={id} setIsLoading={setIsLoading} onSuccess={() => setOpen(false)} />}
              action={(id, isLoading) => (
                  <Button type="submit" variant="destructive" form={id} disabled={isLoading}>
                      {isLoading ? 'Deleting...' : 'Delete permanently'}
                  </Button>
              )}
          />
      );
}
