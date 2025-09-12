import { useState, useEffect } from 'react';
import { createClient } from '../lib/supabase/client';

const useSupabase = () => {
  const [supabase] = useState(() => createClient());

  return supabase;
};

export default useSupabase;