#!/usr/bin/env -S npx tsx

/**
 * Test Service Role Connection Script
 * 
 * This script tests if we can connect to Supabase using the service role key.
 */

// Load environment variables from .env.local
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and service role key from environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

console.log('🔍 Testing Supabase Service Role Connection...\n');

// Check if credentials are provided
if (!supabaseUrl) {
  console.error('❌ Error: SUPABASE_URL not found in environment variables');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY not found in environment variables');
  process.exit(1);
}

console.log(`✅ SUPABASE_URL: ${supabaseUrl}`);
console.log(`✅ SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceKey.substring(0, 10)}...${supabaseServiceKey.substring(supabaseServiceKey.length - 5)}`);

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Test service role connection
async function testServiceConnection() {
  try {
    console.log('\n🔍 Testing service role connection...');
    
    // Try to fetch a simple table with service role access
    const { data, error } = await supabase
      .from('system_settings')
      .select('*')
      .limit(1);
    
    if (error) {
      if (error.message.includes('relation "system_settings" does not exist')) {
        console.log('⚠️  Warning: system_settings table does not exist yet');
        console.log('   This is expected if you haven\'t run the database setup script yet');
        console.log('   Run fixed-database-setup.sql in your Supabase SQL Editor');
      } else {
        console.error('❌ Error connecting with service role:', error.message);
        return false;
      }
    } else {
      console.log('✅ Service role connection successful');
      console.log(`   Found ${data?.length || 0} system_settings records`);
    }
    
    return true;
  } catch (err) {
    console.error('❌ Service role connection error:', err);
    return false;
  }
}

// Test auth users table
async function testAuthUsers() {
  try {
    console.log('\n🔍 Testing auth.users table access...');
    
    // Try to fetch from auth.users table (should work with service role)
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(5);
    
    if (error) {
      console.error('❌ Error accessing auth.users:', error.message);
      return false;
    } else {
      console.log('✅ Auth users access successful');
      console.log(`   Found ${data?.length || 0} auth users`);
      
      // Show the first user if available
      if (data && data.length > 0) {
        console.log(`   First user: ${data[0].email} (ID: ${data[0].id})`);
      }
    }
    
    return true;
  } catch (err) {
    console.error('❌ Auth users access error:', err);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting Supabase service role connection test...\n');
  
  const serviceConnectionSuccess = await testServiceConnection();
  const authUsersSuccess = await testAuthUsers();
  
  console.log('\n📋 Test Summary:');
  console.log(`   Service Role Connection: ${serviceConnectionSuccess ? '✅ Pass' : '❌ Fail'}`);
  console.log(`   Auth Users Access: ${authUsersSuccess ? '✅ Pass' : '❌ Fail'}`);
  
  if (serviceConnectionSuccess && authUsersSuccess) {
    console.log('\n🎉 Service role connection test passed! Supabase is accessible with service role.');
    console.log('\n💡 Next steps:');
    console.log('   1. Run fixed-database-setup.sql in your Supabase SQL Editor');
    console.log('   2. Run the full verification: npm run verify-supabase');
  } else {
    console.log('\n🔧 Please check your Supabase credentials and network connection.');
    process.exit(1);
  }
}

// Run the test
main().catch(console.error);
