import styles from './CommentCard.module.scss'

import defaultPhoto from '../../assets/icons/profile.png'

import { Comment, User } from '../../types/models'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'

import translateDate from '../../helpers/translateDate'

interface CommentCardProps {
  user: User | null;
  comment: Comment;
  handleDeleteComment: ((evt: React.MouseEvent) => Promise<void>);
}

const CommentCard = (props: CommentCardProps): JSX.Element => {
  const { user, comment, handleDeleteComment } = props

  const createdAtAgo = translateDate(comment.createdAt)
  
  return (
    <article className={styles.container} >
      <div id={styles.spacer} className={user?.profile.id === comment.authorId ? styles.active : ''} />
      <div>
        <img src={comment.author.photo ?? defaultPhoto} alt={comment.author.name} />
        <div id={styles.content}>
          <header>
            <p>{comment.author.name}</p>
            <p>{createdAtAgo}</p>
          </header>
          <p>{comment.content}</p>
        </div>
        {user?.id === comment.authorId && <button id={comment.id.toString()} onClick={handleDeleteComment}><FontAwesomeIcon icon={faRemove} /></button>}
      </div>
    </article>
  )
}

export default CommentCard