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

function mapSessionRow (row) {
  return {
    id: row.id,
    classId: row.class_id,
    title: row.title,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    location: row.location ?? '',
    notes: row.notes ?? '',
    isCancelled: row.is_cancelled
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

export async function fetchClassById (classId) {
  if (!classId) return null

  const { data, error } = await supabase
    .from('classes')
    .select('id, slug, title, subject, level, description, cover_image_url, is_active')
    .eq('id', classId)
    .maybeSingle()

  if (error) throw error
  return data ? mapClassRow(data) : null
}

export async function fetchSessionsForClass (classId) {
  if (!classId) return []

  const { data, error } = await supabase
    .from('class_sessions')
    .select('id, class_id, title, starts_at, ends_at, location, notes, is_cancelled')
    .eq('class_id', classId)
    .order('starts_at', { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapSessionRow)
}

function mapAnnouncementRow (row) {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    createdAt: row.created_at
  }
}

function mapQuestionRow (row) {
  return {
    id: row.id,
    authorName: row.profiles?.full_name ?? 'Student',
    createdAt: row.created_at,
    text: row.text,
    answer: row.answer_text ?? null
  }
}

export async function fetchAnnouncementsForClass (classId) {
  if (!classId) return []

  const { data, error } = await supabase
    .from('class_announcements')
    .select('id, class_id, title, body, created_at')
    .eq('class_id', classId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map(mapAnnouncementRow)
}

export async function fetchQuestionsForClass (classId) {
  if (!classId) return []

  const { data, error } = await supabase
    .from('class_questions')
    .select('id, class_id, author_profile_id, text, answer_text, created_at, profiles:profiles!class_questions_author_profile_id_fkey ( full_name )')
    .eq('class_id', classId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map(mapQuestionRow)
}
function mapMaterialRow (row) {
  return {
    id: row.id,
    classId: row.class_id,
    sessionId: row.session_id,
    title: row.title,
    description: row.description ?? '',
    storagePath: row.storage_path,
    mimeType: row.mime_type ?? '',
    fileSize: row.file_size ?? 0,
    createdAt: row.created_at
  }
}

export async function fetchMaterialsForSession (sessionId) {
  if (!sessionId) return []

  const { data, error } = await supabase
    .from('session_materials')
    .select('id, class_id, session_id, title, description, storage_path, mime_type, file_size, created_at')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map(mapMaterialRow)
}

export async function fetchMaterialsForClass (classId) {
  if (!classId) return []

  const { data, error } = await supabase
    .from('session_materials')
    .select('id, class_id, session_id, title, description, storage_path, mime_type, file_size, created_at')
    .eq('class_id', classId)
    .order('session_id', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map(mapMaterialRow)
}

