import { supabase } from 'src/services/supabaseClient'

function mapClassRow (row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subject: row.subject ?? '',
    level: row.level ?? '',
    description: row.description ?? '',
    coverImageUrl: row.cover_image_url ?? ''
  }
}

export async function fetchClassesForTeacher (teacherProfileId) {
  if (!teacherProfileId) {
    return []
  }

  const { data, error } = await supabase
    .from('class_instructors')
    .select(`
      role,
      classes:classes!class_instructors_class_id_fkey!inner (
        id,
        slug,
        title,
        subject,
        level,
        description,
        cover_image_url,
        is_active
      )
    `)
    .eq('instructor_profile_id', teacherProfileId)
    .eq('classes.is_active', true)

  if (error) throw error

  const rows = (data ?? [])
    .map(r => r.classes)
    .filter(Boolean)

  return rows.map(mapClassRow)
}

export async function fetchEnrolledClassesForCurrentUser () {
  const { data: userRes, error: userErr } = await supabase.auth.getUser()
  if (userErr) throw userErr
  const userId = userRes?.user?.id
  if (!userId) return []

  const { data, error } = await supabase
    .from('class_members')
    .select(`
      member_role,
      classes:classes!class_members_class_id_fkey!inner (
        id,
        slug,
        title,
        subject,
        level,
        description,
        cover_image_url,
        is_active
      )
    `)
    .eq('member_profile_id', userId)
    .eq('member_role', 'student')
    .eq('classes.is_active', true)

  if (error) throw error

  const rows = (data ?? [])
    .map(r => r.classes)
    .filter(Boolean)

  return rows.map(mapClassRow)
}

