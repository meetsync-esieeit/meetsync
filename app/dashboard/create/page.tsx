"use client";

import { title } from "@/components/primitives";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Spacer,
  Checkbox,
  user,
} from "@heroui/react";
import React from "react";
import { getLocalTimeZone, now } from "@internationalized/date";
import { Divider } from "@heroui/divider";
import { I18nProvider } from "@react-aria/i18n";

import { createClient } from "@/utils/supabase/client";

export default function Dashboard() {
  const [action, setAction] = React.useState<string | null>(null);
  const [isPaid, setIsPaid] = React.useState(false);
  const [price, setPrice] = React.useState("");
  const [paypalEmail, setPaypalEmail] = React.useState("");
  const [hasReminder, setHasReminder] = React.useState(false);
  const [isEmailDisabled, setIsEmailDisabled] = React.useState(true);

  const [userId, setUserId] = React.useState<any>(null);

  const supabase = createClient();

  React.useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    };
    fetchUser().then((user) => {
      if (user) {
        setUserId(user.id);
      } else {
        setUserId(null);
      }
    });
  }, [supabase]);

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center m-auto  w-full pb-10 h-full pt-10 min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsPaid(checked);
    if (!checked) {
      setPrice("");
      setPaypalEmail("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);

    const { error } = await supabase.from("event").insert({
      event_name: data.event_name,
      event_date: data.event_date.toString().split("T")[0],
      country: data.country,
      city: data.city,
      rue: data.rue,
      price: data.price,
      paypal_email: data.paypal_email,
      owner_id: userId,
      has_reminder: hasReminder,
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center m-auto  w-full pb-10 h-full pt-10 min-h-screen">
      <span className={title({ color: "violet" })}>
        Création d'événements&nbsp;
      </span>
      <Spacer y={4} />
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        onReset={() => setAction("reset")}
        onSubmit={handleSubmit}
      >
        <Input
          isRequired
          errorMessage="Merci d'entrer un nom d'événement valide"
          label="Nom de l'événement"
          labelPlacement="outside"
          name="event_name"
          placeholder="Entrer le nom de l'événement"
          type="text"
        />

        <I18nProvider locale="fr">
          <DatePicker
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
            label="date de l'événéments"
            name="event_date"
            variant="bordered"
          />
        </I18nProvider>
        <Divider />
        <p className="text-xl">Emplacement</p>

        <Input
          isRequired
          errorMessage="Merci d'entrer un nom d'événements valide"
          label="Pays"
          labelPlacement="outside"
          name="country"
          placeholder="Entré le pays de l'événement"
          type="text"
        />

        <Input
          isRequired
          errorMessage="Merci d'entrer un nom d'événements valide"
          label="Ville"
          labelPlacement="outside"
          name="city"
          placeholder="Entrer le nom de la ville"
          type="text"
        />

        <Input
          isRequired
          errorMessage="Merci d'entrer un nom d'événements valide"
          label="Rue"
          labelPlacement="outside"
          name="rue"
          placeholder="Entrer le nom de la rue et le numéro"
          type="text"
        />

        <Divider />
        <p className="text-xl">Autres</p>

        <Checkbox isSelected={isPaid} onChange={handleCheckboxChange}>
          Événement payant
        </Checkbox>

        {isPaid && (
          <>
            <Input
              isRequired
              errorMessage="Merci d'entrer un prix valide"
              label="Prix"
              labelPlacement="outside"
              name="price"
              placeholder="Entrer le prix de l'événement"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              isRequired
              errorMessage="Merci d'entrer un email PayPal valide"
              label="Email PayPal"
              labelPlacement="outside"
              name="paypal_email"
              placeholder="Entrer l'email PayPal du vendeur"
              type="email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
            />
          </>
        )}

        <Checkbox
          onClick={() => setHasReminder(!hasReminder)}
        >
          Rappel automatique
        </Checkbox>
        <p className="text-gray-500 text-xs">
          Rappel automatique est seulement pour les offres{" "}
          <span className="text-violet-500">Plus</span> et{" "}
          <span className="text-violet-500">Pro</span>
        </p>

        <Checkbox
          isDisabled={isEmailDisabled}
          onClick={() => setIsEmailDisabled(!isEmailDisabled)}
        >
          Email personnalisé
        </Checkbox>
        <p className="text-gray-500 text-xs">
          Email personnalisé est seulement pour les offres{" "}
          <span className="text-violet-500">Pro</span>
        </p>

        <div className="flex gap-2">
          <Button color="secondary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="flat">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}
