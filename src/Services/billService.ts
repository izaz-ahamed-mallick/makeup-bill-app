import { supabase } from "../lib/supabase";

export const getBillById = async (id: number) => {
  const { data, error } = await supabase
    .from("bills")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};

export const createBill = async (data: any) => {
  const { data: insertedBill, error } = await supabase
    .from("bills")
    .insert([data])
    .select()
    .single();

  if (error) throw error;

  return insertedBill;
};

export const updateBill = async (id: number, data: any) => {
  const { error } = await supabase
    .from("bills")
    .update(data)
    .eq("id", id);

  if (error) {
    console.error("Update error:", error);
    throw error;
  }
};
