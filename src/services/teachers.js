import { supabase } from 'src/services/supabaseClient'

function isUuid (value) {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
}

function mapTeacherRow (row) {
  const fullName = row?.profiles?.full_name ?? ''
  return {
    profileId: row.profile_id,
    slug: row.slug,
    name: fullName,
    subject: row.subject ?? '',
    school: row.school ?? '',
    level: row.level ?? '',
    about: row.about ?? row.bio ?? '',
    avatarUrl: row.avatar_url ?? '',
    contactMethod: row.contact_method ?? '',
    responseTime: row.response_time ?? '',
    rating: Number(row.rating ?? 0),
    reviewsCount: Number(row.reviews_count ?? 0),
    studentsCount: Number(row.students_count ?? 0)
  }
}

export async function fetchTeachers () {
  const { data, error } = await supabase
    .from('teachers')
    .select(`
      profile_id,
      slug,
      subject,
      bio,
      school,
      level,
      about,
      avatar_url,
      contact_method,
      response_time,
      rating,
      reviews_count,
      students_count,
      is_active,
      profiles:profiles!teachers_profile_id_fkey ( full_name )
    `)
    .eq('is_active', true)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map(mapTeacherRow)
}

export async function fetchTeacherBySlugOrProfileId (slugOrId) {
  let query = supabase
    .from('teachers')
    .select(`
      profile_id,
      slug,
      subject,
      bio,
      school,
      level,
      about,
      avatar_url,
      contact_method,
      response_time,
      rating,
      reviews_count,
      students_count,
      is_active,
      profiles:profiles!teachers_profile_id_fkey ( full_name )
    `)
    .eq('is_active', true)

  query = isUuid(slugOrId) ? query.eq('profile_id', slugOrId) : query.eq('slug', slugOrId)

  const { data, error } = await query.maybeSingle()
  if (error) throw error
  return data ? mapTeacherRow(data) : null
}

