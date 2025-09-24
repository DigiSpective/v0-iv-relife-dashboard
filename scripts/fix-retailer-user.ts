#!/usr/bin/env -S npx tsx

/**
 * Fix Retailer User Script
 * 
 * This script ensures the retailer user has a record in the public.users table.
 */

// Load environment variables from .env.local
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and service role key from environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

console.log('🔍 Fixing retailer user...\n');

// Check if credentials are provided
if (!supabaseUrl) {
  console.error('❌ Error: SUPABASE_URL not found in environment variables');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY not found in environment variables');
  process.exit(1);
}

// Create Supabase client with service role key (admin access)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixRetailerUser() {
  const retailerEmail = 'retailer@iv-relife.com';
  const retailerRole = 'retailer';
  
  try {
    console.log(`Checking retailer user: ${retailerEmail}`);
    
    // Get the retailer user ID from auth
    const { data: authUsers, error: authError } = await supabase
      .from('users')
      .select('id')
      .eq('email', retailerEmail);
    
    if (authError) {
      console.error(`❌ Error finding auth user:`, authError.message);
      return;
    }
    
    if (!authUsers || authUsers.length === 0) {
      console.log(`⚠️  Auth user not found. Please sign up through the application first.`);
      return;
    }
    
    const userId = authUsers[0].id;
    console.log(`Found auth user ID: ${userId}`);
    
    // Check if user exists in public.users
    const { data: publicUsers, error: publicError } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', userId);
    
    if (publicError) {
      console.error(`❌ Error checking public user:`, publicError.message);
      return;
    }
    
    if (publicUsers && publicUsers.length > 0) {
      // User exists, check role
      if (publicUsers[0].role !== retailerRole) {
        console.log(`Updating role from ${publicUsers[0].role} to ${retailerRole}`);
        const { error: updateError } = await supabase
          .from('users')
          .update({ role: retailerRole })
          .eq('id', userId);
        
        if (updateError) {
          console.error(`❌ Error updating role:`, updateError.message);
        } else {
          console.log(`✅ Role updated successfully`);
        }
      } else {
        console.log(`✅ User already has correct role: ${retailerRole}`);
      }
    } else {
      // User doesn't exist in public.users, create record
      console.log(`Creating public user record with role: ${retailerRole}`);
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: retailerEmail,
          role: retailerRole
        });
      
      if (insertError) {
        console.error(`❌ Error creating public user record:`, insertError.message);
      } else {
        console.log(`✅ Public user record created successfully`);
      }
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

async function main() {
  console.log('🚀 Fixing retailer user...\n');
  
  await fixRetailerUser();
  
  console.log('\n📋 Retailer user fix completed!');
  console.log('\n💡 Next steps:');
  console.log('   1. Try logging in again through the application');
  console.log('   2. If issues persist, check the browser console for errors');
}

// Run the script
main().catch(console.error);
