import { useParams } from "react-router";
import { useState, useEffect } from "react";
import CommentFormPage from "../CommentFormPage/CommentFormPage"
import * as hootService from "../../services/hootService";


const HootDetails = () => {
  const { hootId } = useParams();
  const [hoot, setHoot] = useState(null);
  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  };

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setHoot(hootData);
    };
    fetchHoot();
  }, [hootId]);
  if (!hoot) return (
    <p>Loading hoot...</p>
  );
  return (
    <main>
      <section>
        <header>
            <p>{hoot.category.toUpperCase()}</p>
            <h1>{hoot.title}</h1>
            <p>
              {`${hoot.author.name} posted on
              ${new Date(hoot.createdAt).toLocaleDateString()}`}
            </p>
            {hoot.author._id === user._id && (
              <>
                <button>Delete</button>
              </>
            )}
          </header>
        <p>{hoot.text}</p>
      </section>
       <section>
        <h2>Comments</h2>

        <CommentFormPage handleAddComment={handleAddComment} />

        {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {`${comment.author.name} posted on
                ${new Date(comment.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  )
};

export default HootDetails;